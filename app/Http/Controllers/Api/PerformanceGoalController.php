<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PerformanceGoal;
use Illuminate\Http\Request;

class PerformanceGoalController extends Controller
{
    public function index()
    {
        return PerformanceGoal::with('employees')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'progress' => 'required|integer|min:0|max:100',
            'deadline' => 'required|date',
            'assigned_to' => 'array'
        ]);

        $goal = PerformanceGoal::create($data);

        if (!empty($data['assigned_to'])) {
            $goal->employees()->sync($data['assigned_to']);
        }

        return $goal->load('employees');
    }

    public function update(Request $request, PerformanceGoal $goal)
    {
        $data = $request->validate([
            'title' => 'required',
            'progress' => 'required|integer|min:0|max:100',
            'deadline' => 'required|date',
            'assigned_to' => 'array'
        ]);

        $goal->update($data);

        if (!empty($data['assigned_to'])) {
            $goal->employees()->sync($data['assigned_to']);
        }

        return $goal->load('employees');
    }

    public function destroy(PerformanceGoal $goal)
    {
        $goal->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
