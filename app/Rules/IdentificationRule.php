<?php

namespace App\Rules;

use Closure;
use Tavo\ValidadorEc;
use Illuminate\Contracts\Validation\ValidationRule;

class IdentificationRule implements ValidationRule
{
    protected $type;

    public function __construct($type)
    {
        $this->type = $type;
    }

    protected function validateRuc(string $value)
    {
        $identificationValidator = new ValidadorEc();
        return !($identificationValidator->validarRucPersonaNatural($value) || $identificationValidator->validarRucSociedadPrivada($value) || $identificationValidator->validarRucSociedadPublica($value));
    }

    protected function validateDni(string $value)
    {
        $identificationValidator = new ValidadorEc();
        return !$identificationValidator->validarCedula($value);
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!env('IDENTIFICATION_DEBUG')) {
            if ($this->type === 'dni' && $this->validateDni($value)) {
                $fail("La cedula {$value} no es valida.");
            }

            if ($this->type === 'ruc' && $this->validateRuc($value)) {
                $fail("El ruc {$value} no es valido.");
            }
        }
    }
}
