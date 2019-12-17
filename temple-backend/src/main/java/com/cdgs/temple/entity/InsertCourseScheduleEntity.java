package com.cdgs.temple.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "courses_schedule")
@IdClass(InsertCourseScheduleEntity.class)
public class InsertCourseScheduleEntity implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -470237690775417023L;

    @Id
    @Column(name = "course_id")
    private Long courseId;

    @Id
    @Column(name = "course_schedule_date")
    private LocalDate courseScheduleDate;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public LocalDate getCourseScheduleDate() {
        return courseScheduleDate;
    }

    public void setCourseScheduleDate(LocalDate courseScheduleDate) {
        this.courseScheduleDate = courseScheduleDate;
    }

}
