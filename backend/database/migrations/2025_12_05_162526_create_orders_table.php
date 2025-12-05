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
            $table->foreignId('product_id')->nullable()->constrained('products');

            $table->integer('quantity')->nullable();
            $table->decimal('total_price', 10, 2);

            $table->string('status');
            $table->string('payment_method');
            $table->string('payment_status');
            $table->string('payment_url');
            $table->string('payment_id');

            // Shipping details
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
