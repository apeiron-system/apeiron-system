<?php

namespace App\Http\Controllers;

use App\Models\EmployeeModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    //

    public function add($id)
    {

        $employees = EmployeeModel::all();

        return Inertia::render('Contract/Project/AddProjectPage', ["id" => $id, "employees" => $employees]);
    }
}
