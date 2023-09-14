<?php

namespace App\Imports;

use App\Mail\CoerciveAccountMail;
use App\Models\CoerciveAccount;
use App\Models\CoerciveAccountStage;
use App\Models\CoerciveClient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Row;

class CoerciveAccountsImport implements OnEachRow, WithHeadingRow, SkipsOnError, WithMultipleSheets
{
    use Importable, SkipsErrors;

    protected $client;

    public function __construct($cliendId)
    {
        $this->client = CoerciveClient::find($cliendId);
    }

    public function empty($row)
    {
        return empty($row->cedularuc) ||
            empty($row->nombre_cliente) ||
            empty($row->proceso);
    }

    /**
     * @param Row $row
     */
    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row      = (object) $row->toArray();
        $userId   = Auth::id();

        if ($this->empty($row)) {
            return null;
        }

        $stages = CoerciveAccountStage::where(DB::raw('upper(name)'), 'like', "%{$row->etapa}%")->get();
        $stageId = count($stages) > 0 ? $stages->first()->id : null;

        $account = $this->client->accounts()->create([
            'process' => $row->proceso,
            'identification' => $row->cedularuc,
            'name' => $row->nombre_cliente,
            'stage' => $row->etapa,
            'stage_id' => $stageId,
            'principal_amount' => (double) $row->capital,
        ]);

        // if (in_array($stageId, [2, 3])) {
        //     $contact = $account->contacts()
        //         ->where('is_active', true)
        //         ->where('type_id', 4)
        //         ->first();

        //     if (!empty($contact)) {
        //         Mail::to($contact->data->value)
        //             ->send(new CoerciveAccountMail($stageId, $account));
        //     }
        // }
    }

    public function sheets(): array
    {
        return [
            0 => new CoerciveAccountsImport($this->client->id),
        ];
    }
}
