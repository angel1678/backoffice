<?php

namespace App\Rules;

use Closure;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\ValidationRule;

class NickNameRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        collect($value)->each(function ($nickName) use ($fail) {
            if (!User::where('nickname', Str::replace('@', '', $nickName))->exists()) {
                $fail("El usuario existe con alias {$nickName}.");
            }
        });
    }
}
