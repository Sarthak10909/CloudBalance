package backend.cloudBalance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "account")
public class Account {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Long id;

    @Column(nullable = false)
    String arnRole;

    @Column(nullable = false)
    Long accountId;

    @Column(nullable = false)
    String accountName;

    @Column(nullable = false)
    boolean assignedStatus;

    @ManyToMany
    @JoinTable(
        name="users_accounts",
        joinColumns = @JoinColumn(name="account_id"),
        inverseJoinColumns = @JoinColumn(name="user_id"),
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"account_id", "user_id"})
        }
    )
    Set<User> users = new HashSet<>();

}
