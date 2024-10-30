<?php

namespace Database\Factories;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContractFactory extends Factory
{
    protected $model = Contract::class;

    public function definition()
    {
        $isActive = $this->faker->boolean(30);
        $startDate = $this->faker->dateTimeBetween('-2 years', 'now');
        $endDate = $this->faker->dateTimeBetween($startDate, '+2 years');
        
        $prefix = $isActive ? 'ACT' : 'PST';
        $number = str_pad($this->faker->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT);

        return [
            'contract_id' => $prefix . $number,
            'name' => 'Contract ' . $this->faker->word,
            'location' => $isActive ? $this->faker->city . ', ' . $this->faker->state : null,
            'duration' => $isActive ? $this->faker->numberBetween(6, 24) . ' months' : null,
            'budget' => $isActive ? $this->faker->numberBetween(500000, 5000000) : null,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'status' => $isActive ? 'active' : 'past'
        ];
    }
}