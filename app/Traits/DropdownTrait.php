<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait DropdownTrait
{
    protected function scopeDropdown(Builder $builder)
    {
        $columnValue = $this->dropdown->value ?? 'id';
        $columnLabel = $this->dropdown->label ?? 'name';

        $builder->select("{$columnValue} as value", "{$columnLabel} as label");
    }
}
