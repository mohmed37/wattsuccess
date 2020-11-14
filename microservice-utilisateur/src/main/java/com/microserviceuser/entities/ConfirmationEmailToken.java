package com.microserviceuser.entities;



import java.util.Date;
import java.util.UUID;


import javax.persistence.*;


@Entity
@Table(	name = "confirmation_token")
    public class ConfirmationEmailToken {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name="token_id")
        private long tokenid;

        @Column(name="confirmation_token")
        private String confirmationToken;

        @Temporal(TemporalType.TIMESTAMP)
        private Date createdDate;

        @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
        @JoinColumn(nullable = false, name = "usersWatt_id")
        private User user;

        public ConfirmationEmailToken(User user) {
            this.user = user;
            createdDate = new Date();
            confirmationToken = UUID.randomUUID().toString();
        }

    public ConfirmationEmailToken() {
    }

    public long getTokenid() {
        return tokenid;
    }

    public void setTokenid(long tokenid) {
        this.tokenid = tokenid;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
