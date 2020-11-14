package com.microserviceuser.web.exeception;

public class QuestionNotFoundException extends  RuntimeException {
    public QuestionNotFoundException(String message) {
        super(message);
    }
}
