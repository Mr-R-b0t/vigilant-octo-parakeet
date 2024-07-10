external_url ENV['GITLAB_EXTERNAL_URL'] || 'https://gitlab.example.fr'
gitlab_rails['initial_root_password'] = ENV['GITLAB_INITIAL_ROOT_PASSWORD'] || 'example'

# Needed to let gitlab work behind traefik
nginx['listen_https'] = false
nginx['listen_port'] = 80

gitlab_rails['gitlab_ssh_host'] = ENV['GITLAB_SSH_HOST'] || 'gitlab.example.fr'
gitlab_rails['lfs_enabled'] = true

# container registry
registry_external_url ENV['REGISTRY_EXTERNAL_URL'] || 'http://registry.example.fr'
registry['enable'] = true
gitlab_rails['registry_enabled'] = true
registry_nginx['enable'] = true
registry_nginx['listen_port'] = 5005
registry_nginx['listen_https'] = false
registry_nginx['proxy_set_headers'] = {
  "Host" => "$http_host",
  "X-Real-IP" => "$remote_addr",
  "X-Forwarded-For" => "$proxy_add_x_forwarded_for",
  "X-Forwarded-Proto" => "https",
  "X-Forwarded-Ssl" => "on"
}

gitlab_rails['rack_attack_git_basic_auth'] = {
  'enabled' => true,
  'ip_whitelist' => ["127.0.0.1"],
  'maxretry' => 10,
  'findtime' => 600,
  'bantime' => 136000
}
