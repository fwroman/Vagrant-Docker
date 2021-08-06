# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.

# SCRIPT PARA INSTALAR DOCKER LUEGO DEL COMANDO VAGRANT UP
############### INLINE SCRIPTS
@docker_install = <<SCRIPT
  ##### Add Docker Repo
  DOCKER_REPO="https://download.docker.com/linux/ubuntu"
  curl -fsSL ${DOCKER_REPO}/gpg | apt-key add -
  add-apt-repository \
    "deb [arch=amd64] ${DOCKER_REPO} \
    $(lsb_release -cs) \
    stable"
  apt-get update -qq
  ##### Prerequisites (just in case)
  apt-get install -y --no-install-recommends \
      apt-transport-https \
      ca-certificates \
      software-properties-common
  ##### Install Docker
  apt-get install -y docker-ce
  usermod -aG docker 'vagrant'
  ##### Installing docker-compose
  curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  ##### Creating a container for mongodb with the created docker-compose.yml file
  mkdir /home/vagrant/mongo-database
  cd /vagrant/mongodb
  docker-compose up -d
  docker ps -a
SCRIPT
###############
####

Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 4
  end
  config.vm.box = "ubuntu/xenial64"
  config.vm.hostname = "fred-docker.dev"
  config.vm.network "forwarded_port", host_ip: "127.0.0.1", guest: 27017, host: 27000
  config.vm.network "forwarded_port", host_ip: "127.0.0.1", guest: 3000, host: 8080

  # Docker Dev Enivironment
  config.vm.provision "shell", inline: @docker_install
  
  ## Docker Volume and Network
  #config.vm.provision "shell", name: "docker_volume.sh", inline: "# >>> script goes here <<<"
  #config.vm.provision "shell", name: "docker_network.sh", inline: "# >>> script goes here <<<"
  
  ## Docker Containers
  #config.vm.provision "docker" { |d| d.run "mysql:5.7", dameonize: true, restart: "always", args: ""  }
  #config.vm.provision "docker" { |d| d.run "wordpress:latest", dameonize: true, restart: "always", args: "" }


  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end
