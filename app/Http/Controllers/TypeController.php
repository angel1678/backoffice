<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $proceduralStage = Type::group($request->group)
            ->when($request->has('parentId'), function ($query) use ($request) {
                $query->join('types_relationships', 'types.id', 'types_relationships.type_id')
                    ->where('types_relationships.parent_type_id', $request->parentId);
            })
            ->get();
        return back()->with('proceduralStage', $proceduralStage);
    }
}
