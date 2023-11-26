#AWS

##Updating the EC2 with the current github version.
0. open terminal on the mac.
1. navigate to the folder that holds the private key.
2. run the command: 
3. enter 'ceremony_builder' by running `cd ceremony_builder`.
4. pull the current branch from github: `git pull origin main`.
5. install any new packages that were added: `npm install`.
6. change permissions for the /dist folder from nginix to ec2-user and run the build: `sudo chown -R ec2-user:ec2-user /home/ec2-user/ceremony_builder/dist/
npm run build`
7. change the permissions back: `sudo chown -R nginx:nginx /home/ec2-user/ceremony_builder/dist/`
8. restart nginx: `sudo systemctl restart nginx`
