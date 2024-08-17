<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyRecord extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'meal_type', 'photo_path', 'school_id', 'description'];

    public function items()
    {
        return $this->belongsToMany(Item::class, 'daily_record_item')
            ->withTimestamps();
    }
}
