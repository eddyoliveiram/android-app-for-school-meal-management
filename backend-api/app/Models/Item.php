<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'quantity', 'supplier', 'received_at'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function schools()
    {
        return $this->belongsToMany(School::class)
            ->withPivot('quantity_received', 'quantity_consumed', 'received_at')
            ->withTimestamps();
    }

    public function dailyRecords()
    {
        return $this->belongsToMany(DailyRecord::class, 'daily_record_item')
            ->withTimestamps();
    }
}

