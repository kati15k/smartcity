<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('universities', function (Blueprint $table) {
           
            $table->id();
            $table->string('name');
            $table->string('latitude');
            $table->string('longitude');
            $table->string('img_url');
            $table->integer('established_year');
            $table->string('website');
            $table->string('contact_email')->nullable();
            $table->string('phone_number')->nullable();
            $table->timestamps();
           
        });  
      }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('universities');
    }
};
