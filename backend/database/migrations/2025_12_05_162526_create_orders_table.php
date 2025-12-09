<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users');

            $table->decimal('total_price', 10, 2);

            $table->string('status');
            $table->string('payment_method');
            $table->string('payment_status');
            $table->string('payment_url')->nullable();
            $table->string('payment_id')->nullable();

            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->string('phone');
            $table->string('email');
            $table->string('name');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
