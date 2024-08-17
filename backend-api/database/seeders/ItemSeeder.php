<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Category;

class ItemSeeder extends Seeder
{
    public function run()
    {
        $NaoPerecivelId = Category::where('name', 'Não perecíveis')->first()->id;
        $ProteinasId = Category::where('name', 'Proteínas')->first()->id;
        $LaticiniosId = Category::where('name', 'Laticínios')->first()->id;
        $ProcessadosId = Category::where('name', 'Processados')->first()->id;

        Item::create([
            'category_id' => $NaoPerecivelId,
            'quantity' => rand(9,50),
            'supplier' => 'Arroz Gama Lopes 5kg',
            'received_at' => '2024-08-17'
        ]);

        Item::create([
            'category_id' => $NaoPerecivelId,
            'quantity' => rand(9,50),
            'supplier' => 'Feijão Gama Lopes 5kg',
            'received_at' => '2024-08-18'
        ]);

        Item::create([
            'category_id' => $NaoPerecivelId,
            'quantity' => rand(9,50),
            'supplier' => 'Sal Lebre 1kg',
            'received_at' => '2024-08-19'
        ]);

        Item::create([
            'category_id' => $ProcessadosId,
            'quantity' => rand(9,50),
            'supplier' => 'Nuggets Sadia 1kg',
            'received_at' => '2024-08-19'
        ]);

        Item::create([
            'category_id' => $LaticiniosId,
            'quantity' => rand(9,50),
            'supplier' => 'Leite em pó Piracanjuba 1kg',
            'received_at' => '2024-08-19'
        ]);

        Item::create([
            'category_id' => $NaoPerecivelId,
            'quantity' => rand(9,50),
            'supplier' => 'Café 1kg',
            'received_at' => '2024-08-19'
        ]);

        Item::create([
            'category_id' => $ProteinasId,
            'quantity' => rand(9,50),
            'supplier' => 'Peito de Frango 1kg',
            'received_at' => '2024-08-19'
        ]);

        Item::create([
            'category_id' => $ProcessadosId,
            'quantity' => rand(9,50),
            'supplier' => 'Biscoito Waffer 165g',
            'received_at' => '2024-08-19'
        ]);

        Item::create([
            'category_id' => $ProcessadosId,
            'quantity' => rand(9,50),
            'supplier' => 'Guaraná 2l',
            'received_at' => '2024-08-19'
        ]);
    }
}
