<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;

class ShiftController extends Controller
{
    public function index()
    {
        return response()->json(Shift::orderBy('date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'name' => 'required|string|max:255',
            'employee_id' => 'nullable|string|max:50',
            'time' => 'required|string|max:255',
            'role' => 'required|string|max:50',
            'status' => 'required|string|max:50',
        ]);

        $shift = Shift::create($validated);

        return response()->json($shift, 201);
    }

    public function update(Request $request, $id)
    {
        $shift = Shift::findOrFail($id);
        $shift->update($request->all());
        return response()->json($shift);
    }

    public function destroy($id)
    {
        Shift::destroy($id);
        return response()->json(['message' => 'Shift deleted successfully']);
    }
}
