<?php

namespace App\Http\Controllers;

use App\Models\DailyRecord;
use Illuminate\Http\Request;

class DailyRecordController extends Controller
{
    public function index()
    {
        $dailyRecords = DailyRecord::all();
        return response()->json($dailyRecords, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|exists:schools,id',
            'date' => 'required|date',
            'meal_type' => 'required|in:café da manhã,almoço,lanche',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('meal_photos', 'public');
        }

        $dailyRecord = DailyRecord::create([
            'school_id' => $validated['school_id'],
            'date' => $validated['date'],
            'meal_type' => $validated['meal_type'],
            'photo_path' => $photoPath,
            'description' => $validated['description'],
        ]);

        return response()->json($dailyRecord, 201);
    }

    public function show($id)
    {
        $dailyRecord = DailyRecord::findOrFail($id);
        return response()->json($dailyRecord, 200);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'school_id' => 'required|exists:schools,id',
            'date' => 'required|date',
            'meal_type' => 'required|in:café da manhã,almoço,lanche',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
        ]);

        $dailyRecord = DailyRecord::findOrFail($id);

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('meal_photos', 'public');
            $dailyRecord->photo_path = $photoPath;
        }

        $dailyRecord->update([
            'school_id' => $validated['school_id'],
            'date' => $validated['date'],
            'meal_type' => $validated['meal_type'],
            'photo_path' => $dailyRecord->photo_path,
            'description' => $validated['description'],
        ]);

        return response()->json($dailyRecord, 200);
    }

    public function destroy($id)
    {
        $dailyRecord = DailyRecord::findOrFail($id);
        $dailyRecord->delete();

        return response()->json(['message' => 'Daily record deleted successfully.'], 200);
    }

    public function showRecordForSchool($schoolId, $dailyRecordId)
    {
        $dailyRecord = DailyRecord::with('items')
            ->where('id', $dailyRecordId)
            ->where('school_id', $schoolId)
            ->first();

        if ($dailyRecord) {
            return response()->json($dailyRecord, 200);
        }

        return response()->json(['error' => 'Daily record not found.'], 404);
    }

}
