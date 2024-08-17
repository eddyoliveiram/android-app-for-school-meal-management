<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\School;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolItemSeeder extends Seeder
{
    public function run()
    {
        $school = School::find(1);
        $items = Item::all();

        foreach ($items as $item) {
            $school->items()->attach($item->id, [
                'quantity_received' => rand(100, 500),
                'quantity_consumed' => rand(0, 100),
                'received_at' => now(),
            ]);
        }

        $school2 = School::find(2);

        foreach ($items as $item) {
            $school2->items()->attach($item->id, [
                'quantity_received' => rand(100, 500),
                'quantity_consumed' => rand(0, 100),
                'received_at' => now(),
            ]);
        }
    }
}
