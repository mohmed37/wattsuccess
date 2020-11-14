package com.tests.web.exceptions;

public class QuestioneNotFoundException extends RuntimeException {
    public QuestioneNotFoundException(String message) {
        super(message);
    }
}
