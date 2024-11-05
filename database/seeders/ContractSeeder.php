<?php

namespace Database\Seeders;

use App\Models\Contract;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    public function run()
    {
        Contract::factory()->count(count: 5)->create();
    }
}