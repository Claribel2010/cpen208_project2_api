import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT lt.id, l.lecturer_id, l.first_name || ' ' || l.last_name AS lecturer_name,
              t.ta_id, t.first_name || ' ' || t.last_name AS ta_name,
              c.course_id, c.course_title, lt.semester
       FROM lecturer_ta lt
       JOIN lecturer l ON l.lecturer_id = lt.lecturer_id
       JOIN ta t ON t.ta_id = lt.ta_id
       JOIN course c ON c.course_id = lt.course_id
       ORDER BY lt.semester, c.course_id`
    );
    return Response.json({ success: true, count: result.rows.length, assignments: result.rows });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}