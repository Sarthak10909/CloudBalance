package backend.cloudBalance.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String firstName;

    private String lastName;

    @NonNull
    private String email;

    @NonNull
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role_id", nullable = false)
    private Role role;

    @ManyToMany(mappedBy = "users")
    Set<Account> accounts = new HashSet<>();
}
