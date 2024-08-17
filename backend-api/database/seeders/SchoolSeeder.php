<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    public function run()
    {
        School::create([
            'name' => 'Escola Municipal ABC',
            'address' => 'Rua Principal, 123',
            'number_of_students' => 500,
        ]);

        School::create([
            'name' => 'Colégio Estadual XYZ',
            'address' => 'Avenida Secundária, 456',
            'number_of_students' => 800,
        ]);
    }
}
