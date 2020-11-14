package com.tests.security;

import com.tests.bean.UserBean;
import com.tests.proxy.MuserProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	MuserProxy muserProxy;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserBean user = muserProxy.findUserByUsername(username);

		return UserDetailsImpl.build(user);
	}

}
