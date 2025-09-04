<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AttendanceSetting;

class AttendanceSettingSeeder extends Seeder
{
    public function run(): void
    {
        AttendanceSetting::query()->firstOrCreate(['id' => 1], [
            'regularization'     => false,
            'on_duty'            => false,
            'hourly_permission'  => false,
            'breaks'             => false,
            'kiosk'              => false,
            'office_remote'      => false,
            'attendance_policy_name' => null,
            'overtime_enabled'   => false,
        ]);
    }
}
