<?php

namespace App\Rules;

use App\Models\Proceso;
use Closure;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\ValidationRule;

class JudicialProcessRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        [$judicaturaId, $anioId, $numeroId] = explode('-', $value);

        if (Proceso::where([
            ['judicatura_id', $judicaturaId],
            ['anio_id', $anioId],
            ['numero_id', $numeroId]
        ])->exists()) {
            $fail("Ya existe un proceso registrado con el codigo {$value}");
        }
    }
}
