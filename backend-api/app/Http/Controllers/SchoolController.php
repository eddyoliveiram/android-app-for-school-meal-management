<?php
namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function index()
    {
        return response()->json(School::all(), 200);
    }

    public function show($id)
    {
        $school = School::find($id);

        if ($school) {
            return response()->json($school, 200);
        }

        return response()->json(['error' => 'School not found'], 404);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'number_of_students' => 'required|integer|min:0',
        ]);

        $school = School::create($validated);

        return response()->json($school, 201);
    }

    public function update(Request $request, $id)
    {
        $school = School::find($id);

        if ($school) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'number_of_students' => 'required|integer|min:0',
            ]);

            $school->update($validated);

            return response()->json($school, 200);
        }

        return response()->json(['error' => 'School not found'], 404);
    }

    public function destroy($id)
    {
        $school = School::find($id);

        if ($school) {
            $school->delete();
            return response()->json(['message' => 'School deleted successfully'], 200);
        }

        return response()->json(['error' => 'School not found'], 404);
    }

    public function registerItem(Request $request, $schoolId)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'quantity_received' => 'required|integer|min:1',
            'received_at' => 'required|date',
        ]);

        $school = School::findOrFail($schoolId);

        $school->items()->attach($validated['item_id'], [
            'quantity_received' => $validated['quantity_received'],
            'received_at' => $validated['received_at'],
        ]);

        return response()->json(['message' => 'Item registered with success.'], 201);
    }

    public function updateItemConsumption(Request $request, $schoolId, $itemId)
    {
        $validated = $request->validate([
            'quantity_consumed' => 'required|integer|min:1',
        ]);

        $school = School::findOrFail($schoolId);

        $school->items()->updateExistingPivot($itemId, [
            'quantity_consumed' => $validated['quantity_consumed'],
        ]);

        return response()->json(['message' => 'Inventory updated with success.'], 200);
    }

    public function getItems($schoolId)
    {
        $school = School::with('items')->findOrFail($schoolId);
        return response()->json($school->items, 200);
    }

}
