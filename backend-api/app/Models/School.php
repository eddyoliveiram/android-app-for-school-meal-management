<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'number_of_students'];

    public function items()
    {
        return $this->belongsToMany(Item::class)
            ->withPivot('quantity_received', 'quantity_consumed', 'received_at')
            ->withTimestamps();
    }
}
