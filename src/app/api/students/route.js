import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT student_id, first_name, last_name, email, program, level, phone
       FROM student
       ORDER BY student_id`
    );
    return Response.json({ success: true, count: result.rows.length, students: result.rows });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}