<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'status',
        'payment_method',
        'payment_status',
        'payment_url',
        'payment_id',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'email',
<<<<<<< HEAD
        'name'
=======
        'name',
        'total'
>>>>>>> e22b441 (Initial project commit)
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

<<<<<<< HEAD
=======
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

>>>>>>> e22b441 (Initial project commit)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
