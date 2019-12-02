package com.cdgs.temple.dto;

import java.io.Serializable;

public class ForgetPassDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1853716198256100356L;
	private String email;
    private String username;
    private Long userId;
    
    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
