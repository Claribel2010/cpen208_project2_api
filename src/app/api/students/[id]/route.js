import pool from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await pool.query(
      `SELECT student_id, first_name, last_name, email, program, level, phone, date_registered
       FROM student
       WHERE student_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json({ success: false, error: 'Student not found.' }, { status: 404 });
    }

    return Response.json({ success: true, student: result.rows[0] });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}