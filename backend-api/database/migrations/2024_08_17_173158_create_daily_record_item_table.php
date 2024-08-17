<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailyRecordItemTable extends Migration
{
    public function up()
    {
        Schema::create('daily_record_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_record_id')->constrained()->onDelete('cascade');
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('daily_record_item');
    }
}
