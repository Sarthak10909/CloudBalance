package backend.cloudBalance.service.impl;

import backend.cloudBalance.entity.User;
import backend.cloudBalance.exception.UserNotFoundException;
import backend.cloudBalance.repo.UserRepository;
import backend.cloudBalance.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found : " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .roles(user.getRole().getRoleType().name().replace("ROLE_", ""))
                .password(user.getPassword())
                .build();
    }
}
