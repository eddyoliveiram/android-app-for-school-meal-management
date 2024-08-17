<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemSchoolTable extends Migration
{
    public function up()
    {
        Schema::create('item_school', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->integer('quantity_received');
            $table->integer('quantity_consumed')->default(0);
            $table->date('received_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('item_school');
    }
}
