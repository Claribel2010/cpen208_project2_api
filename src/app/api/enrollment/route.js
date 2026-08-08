import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id');

    let result;
    if (studentId) {
      result = await pool.query(
        `SELECT e.enrollment_id, e.student_id, e.course_id, c.course_title, e.semester, e.date_enrolled
         FROM enrollment e
         JOIN course c ON e.course_id = c.course_id
         WHERE e.student_id = $1
         ORDER BY e.semester, e.course_id`,
        [studentId]
      );
    } else {
      result = await pool.query(
        `SELECT e.enrollment_id, e.student_id, e.course_id, c.course_title, e.semester, e.date_enrolled
         FROM enrollment e
         JOIN course c ON e.course_id = c.course_id
         ORDER BY e.student_id, e.semester`
      );
    }

    return Response.json({ success: true, count: result.rows.length, enrollments: result.rows });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { student_id, course_id, semester } = await request.json();

    if (!student_id || !course_id || !semester) {
      return Response.json({ success: false, error: 'student_id, course_id, and semester are required.' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO enrollment (student_id, course_id, semester)
       VALUES ($1, $2, $3)
       ON CONFLICT (student_id, course_id, semester) DO NOTHING`,
      [student_id, course_id, semester]
    );

    return Response.json({ success: true, message: 'Enrolled successfully.' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { student_id, course_id, semester } = await request.json();

    if (!student_id || !course_id || !semester) {
      return Response.json({ success: false, error: 'student_id, course_id, and semester are required.' }, { status: 400 });
    }

    await pool.query(
      `DELETE FROM enrollment WHERE student_id = $1 AND course_id = $2 AND semester = $3`,
      [student_id, course_id, semester]
    );

    return Response.json({ success: true, message: 'Dropped successfully.' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}