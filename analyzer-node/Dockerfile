# OS: alpine linux
# Node.js: 20.x.x
FROM node:20-alpine

# Create app directory
WORKDIR /app

COPY ./package*.json ./
# RUN npm install
# RUN apk add --no-cache vim
#Q RUN apk add --no-cache xeyes

RUN apk add --no-cache vim

# RUN apk add --no-cache openssh
# RUN apk add --no-cache xauth
# RUN apk add --no-cache openrc

# RUN ssh-keygen -A
# RUN mkdir /var/run/sshd

# RUN adduser -D -u 1001 ayato

RUN echo 'root:root_password' | chpasswd
# RUN echo 'ayato:ayato_password' | chpasswd
# RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
# RUN sed -i 's/X11Forwarding no/X11Forwarding yes/' /etc/ssh/sshd_config
# RUN sed -i 's/#X11DisplayOffset 10/X11DisplayOffset 0/' /etc/ssh/sshd_config
# RUN sed -i 's/#X11UseLocalhost yes/X11UseLocalhost yes/' /etc/ssh/sshd_config
# RUN sed -i 's/#PasswordAuthentication no/PasswordAuthentication no/' /etc/ssh/sshd_config
# RUN sed -i 's/#PubkeyAuthentication no/PubkeyAuthentication yes/' /etc/ssh/sshd_config


# Listen port
EXPOSE 2000
EXPOSE 22

# RUN /usr/sbin/sshd -D

# CMD ["/usr/sbin/sshd", "-D"]

# COPY ./setup.sh /root/
# RUN chmod a+x /root/setup.sh
# RUN echo "/root/setup.sh" >> /root/.bashrc
# ENTRYPOINT ["/root/setup.sh"]

# ENTRYPOINT ["/usr/sbin/sshd", "-D"]
