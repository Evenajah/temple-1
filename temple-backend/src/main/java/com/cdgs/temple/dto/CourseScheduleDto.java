package com.cdgs.temple.dto;

import com.cdgs.temple.entity.CourseEntity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;


public class CourseScheduleDto implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 2152388262292088237L;

    private Long courseId;
    private LocalDate courseScheduleDate;
    private CourseEntity course;
    private int student;

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

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

	public int getStudent() {
		return student;
	}

	public void setStudent(int student) {
		this.student = student;
	}
}