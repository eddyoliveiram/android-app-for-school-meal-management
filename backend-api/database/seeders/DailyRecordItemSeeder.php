<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DailyRecord;
use App\Models\Item;

class DailyRecordItemSeeder extends Seeder
{
    public function run()
    {

        $CafeDaManha = DailyRecord::find(1);
        $LancheDaTarde = DailyRecord::find(2);

        $leite = Item::where('supplier', 'Leite em pó Piracanjuba 1kg')->first();
        $cafe = Item::where('supplier', 'Café 1kg')->first();
        $waffer = Item::where('supplier', 'Biscoito Waffer 165g')->first();
        $guarana = Item::where('supplier', 'Guaraná 2l')->first();

        $CafeDaManha->items()->attach($leite->id);
        $CafeDaManha->items()->attach($cafe->id);

        $LancheDaTarde->items()->attach($waffer->id);
        $LancheDaTarde->items()->attach($guarana->id);
    }
}
