<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DailyRecord;

class DailyRecordSeeder extends Seeder
{
    public function run()
    {
        DailyRecord::create([
            'school_id' => 1,
            'date' => '2024-08-17',
            'meal_type' => 'café da manhã',
            'photo_path' => 'meal_photos/cafe_manha_2024_08_17.jpg'
        ]);

        DailyRecord::create([
            'school_id' => 1,
            'date' => '2024-08-17',
            'meal_type' => 'Lanche da Tarde',
            'photo_path' => 'meal_photos/almoco_2024_08_17.jpg'
        ]);

        DailyRecord::create([
            'school_id' => 2,
            'date' => '2024-08-17',
            'meal_type' => 'Lanche da Tarde',
            'photo_path' => 'meal_photos/lanche_2024_08_17.jpg'
        ]);
    }
}
