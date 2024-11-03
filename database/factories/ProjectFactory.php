<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'contract_id' => Contract::factory(), // Creates a related contract
            'item_no' => $this->faker->numberBetween(1, 100),
            'description' => $this->faker->sentence,
            'unit' => $this->faker->randomElement(['pcs', 'meters', 'kg']),
            'qty' => $this->faker->numberBetween(1, 100),
            'unit_cost' => $this->faker->randomFloat(2, 10, 1000),
            'budget' => $this->faker->randomFloat(2, 1000, 100000),
            'progress' => $this->faker->randomFloat(2, 0, 100),
            'status' => $this->faker->randomElement(['completed', 'on-going']),
        ];
    }
}
