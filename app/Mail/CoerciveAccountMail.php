<?php

namespace App\Mail;

use App\Casts\CurrencyFormat;
use Rmunate\Utilities\SpellNumber;
use Tavo\ValidadorEc;
use Illuminate\Support\Str;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Models\CoerciveAccount;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class CoerciveAccountMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $validator;
    protected $isRuc;
    protected $identificationType;
    protected $amountInLetters;

    protected $date;
    protected $hour;

    protected $views = [
        2 => 'emails.coercive.voluntary_payment_requirement',
        3 => 'emails.coercive.pay_order',
    ];

    protected $fileAttachments = [
        2 => [
            'pdfs.coercive.voluntary_payment_requirement'
        ],
        3 => [
            'pdfs.coercive.pay_order'
        ],
    ];

    /**
     * Create a new message instance.
     */
    public function __construct(protected $stageId, protected CoerciveAccount $account)
    {
        $this->validator = new ValidadorEc;

        $this->isRuc = $this->validator->validarRucPersonaNatural($this->account->identification) ||
            $this->validator->validarRucSociedadPrivada($this->account->identification) ||
            $this->validator->validarRucSociedadPublica($this->account->identification);

        $this->identificationType = $this->isRuc ? 'ruc' : 'cédula de ciudadanía';

        $this->amountInLetters = SpellNumber::value($account->principal_amount)
            ->locale('es')
            ->currency('DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA')
            ->toMoney();

        $account->mergeCasts([
            'principal_amount' => CurrencyFormat::class,
        ]);

        $this->date = now()->format('d/m/Y');
        $this->hour = now()->format('H:i');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = '';
        if (in_array($this->stageId, [2, 3])) {
            $subject = "NOTIFICACIÓN DE PROCESO COACTIVO No. {$this->account->process}";
        }

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: $this->views[$this->stageId],
            with: [
                'account' => $this->account,
                'isRuc' => $this->isRuc,
                'identificationType' => $this->identificationType,
                'amountInLetters' => $this->amountInLetters,
                'date' => $this->date,
                'hour' => $this->hour,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        $files = $this->fileAttachments[$this->stageId];

        foreach ($files as $file) {
            $pdf = Pdf::loadView($file, [
                'account' => $this->account,
                'isRuc' => $this->isRuc,
                'identificationType' => $this->identificationType,
                'amountInLetters' => Str::upper($this->amountInLetters),
                'date' => $this->date,
                'hour' => $this->hour,
            ]);
            $attachments[] = Attachment::fromData(fn () => $pdf->output(), Str::uuid().'.pdf');
        }

        return $attachments;
    }
}
