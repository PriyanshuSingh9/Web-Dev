# Hosting:
Web hosting is the foundational service that makes websites and applications accessible on the internet. 
It involves renting space and resources on specialized computers called servers, which store website files and deliver them to users 24/7. 
The hosting landscape offers a spectrum of solutions tailored to different needs, from basic Shared Hosting , to Virtual Private Server (VPS)  Cloud Hosting, exemplified by platforms like Amazon Web Services (AWS), provides unparalleled scalability and reliability by utilizing a vast network of interconnected servers, allowing resources to be adjusted in real-time based on traffic demands.

## Types of hosting:
1. Shared hosting
   - Multiple sites share the same server and it's resources.
   - For personal blogs and small businesses
2. VPS hosting
   - Site gets a reserved portion of the servers resources like a vm.
   - Hosting which provides a balance of cost and control, and high-end Dedicated Hosting offering exclusive server use for large-scale operations.
3. Dedicated hosting
   - Entire physical server is dedicated to a single user.
   - Provides highest power and control.
4. Cloud hosting
   -  With cloud hosting, your website’s data and applications are spread across multiple servers.
   -  The system draws its resources from a vast network of existing servers, ensuring that if one server fails, others compensate to maintain operation. 
   -  This infrastructure minimizes data loss risks and provides robust backup and recovery solutions.
   -  Best for unpredictable/fluctuating traffic.
5. Managed hosting
   - A provider handles setup, software, hardware, maintainence and security updates.
   - Example wordpress hosting

## Server access and Deployment:
### SSH
   The method of accessing a remote server using **SSH (Secure Shell)** along with the **Root User, IP Address, and Password** is the foundational mechanism for gaining total administrative control and deploying applications onto environments like a Virtual Private Server (VPS),,.

This process grants the user the capability to manage the operating system, configure the environment, and handle all deployment activities independently.

#### 1. The Technical Access Mechanism

SSH is the technological pipeline that connects a user’s local machine terminal (e.g., on Windows or Mac) to the remote server's command-line interface, enabling full operation of that cloud computer,.

**The Required Credentials:** To establish this connection, the user must acquire three specific pieces of information from their hosting provider:
1.  **IP Address:** The unique network address of the VPS instance,.
2.  **Username:** Typically the **`root` user**, which is the administrative account possessing the highest level of authority and the power to perform almost any action on the system,.
3.  **Password:** A confidential password selected during the server setup process,,.

**The Connection Process:** The user initiates the access by running a command in their local terminal, typically structured as `SSH root@IP_Address`,,. The system then prompts the user for the root password for authentication,. Once authenticated, the user is logged into the remote machine’s terminal and can execute commands on the cloud computer,,.

#### 2. Context in Server Deployment and Control

In the larger context of server management, this level of SSH access is crucial because it provides **full customisation and control** over the environment,.

*   **Custom Deployment:** With root access, the user can install, configure, and secure any compatible software they need, such as Node.js, Express, or web servers like Apache or Nginx,,. This freedom is paramount for running custom applications,.
*   **Persistent Operation:** A key feature of this deployment model is that once an application is launched via the SSH terminal (often using a process manager like PM2), the cloud computer remains **operational 24/7**, and the application continues to run even if the user closes their local terminal session,,,.
*   **File Transfer:** While SSH commands can handle single files, specialized tools like **FileZilla** utilize the same IP Address, username, and password over **SFTP** (Secure File Transfer Protocol) to allow bulk file transfer using a drag-and-drop interface, which is useful for uploading application code,,,.
*   **Management Simplicity:** For traditional VPS hosting, SSH is considered the simple method for managing the server environment directly.

#### 3. Responsibility and Technical Expertise

Because VPS hosting frequently comes with full root access, the user takes on significant **technical responsibility**.

The autonomy gained through SSH means the user is accountable for all operational aspects, including server maintenance, installing security updates, and troubleshooting issues,,,. This management style typically requires more technical expertise compared to managed hosting solutions,,.

You can view SSH access using root credentials as being given the **keys to the engine room** of a dedicated ship (your server): you have the necessary access to customize and optimize every component to your exact needs, but you are also entirely responsible for performing all maintenance, repair, and security work yourself.

### File Transfer:
File transfer is a fundamental stage in server access and deployment, providing the mechanism to physically move application components and code from a local computer to the remote virtual server (VPS),.

The sources discuss two primary ways files can be transferred: the command-line approach (SCP) and a graphical client approach (FileZilla/SFTP), emphasizing the utility of the latter for ease of deployment.

#### 1. File Transfer Methods

While single file transfers can theoretically be handled by commands like **SCP** (Secure Copy), the sources highlight that a graphical utility is preferred when dealing with bulk data or complex application structures,.

The recommended tool for this task is **FileZilla**, a software utility designed for file management on remote servers,.

#### 2. FileZilla and Secure File Transfer Protocol (SFTP)

FileZilla provides a straightforward, graphical way to manage files on the remote server, functioning similarly to a local file explorer on a Windows computer.

*   **Protocol:** FileZilla secures the transfer process by utilizing **SFTP** (Secure File Transfer Protocol), which typically runs on port 22. This ensures that application code and assets are transferred securely over the network.
*   **Required Credentials:** To connect, FileZilla uses the same administrative details established for terminal access via SSH: the server's **IP Address, the Username** (e.g., `root`), and the **Password**,.
*   **Interface Advantage:** The key feature highlighted is the ability to transfer files using a **Drag & Drop** interface. This drastically simplifies the process of moving large numbers of files or entire application folders in bulk, making it easier than executing commands for every file,,.

#### 3. Context in Deployment

The ability to transfer files efficiently is crucial for preparing the server environment for launch:

*   **Uploading Application Code:** Users can drag and drop their complete application folder structure (e.g., a Node.js/Express application) onto the remote server directory,,. This transfers all necessary files, such as web page files, code, images, and other content, to the hosting account on the server.
*   **Bulk Transfer:** This graphical approach is particularly useful when transferring numerous files or large files, potentially up to the gigabytes of available storage space on the server,. For example, when uploading an application that might require 50 GB of disk space or more.
*   **Security Context:** The security of data during transaction is a major concern in cloud environments, but using SFTP ensures that data is protected during transmission.

Once the files are transferred, the user can then return to the SSH terminal to run installation or launch commands (e.g., `pm2 start index.js`) to get the application running,,.

You can think of FileZilla (SFTP) as being the **service elevator** for your server: while you could use complex commands (stairs) to carry individual items, the service elevator allows you to load entire boxes (application folders) and quickly and securely drag-and-drop them into your new space.

### Deployment Tools (AWS): Lightsail (VPS), Elastic Beanstalk, App Runner, Amplify
The sources describe a range of AWS deployment tools that offer varying degrees of automation, control, and complexity, supporting the architectural shift toward elastic and scalable cloud environments,. These services automate the deployment, scaling, and operational management of web applications.

Here is a discussion of the specific AWS deployment tools mentioned:

### 1. Amazon Lightsail (Virtual Private Server/VPS)

Lightsail is positioned as an **easy-to-use Virtual Private Server (VPS)** solution offered by AWS.

*   **Deployment and Pricing:** It provides everything necessary to build an application or website under a **cost-effective, monthly plan**. Lightsail is described as ideal for simpler workloads, quick deployments, and helping users get started on AWS, with packages that offer strong bandwidth,,. It is designed to allow users to start small and then scale as their needs grow.
*   **Context:** Lightsail packages are considered competitive with offerings like DigitalOcean Droplet packages for hosting low-traffic web servers, sometimes offering more value for the price,.

### 2. AWS Elastic Beanstalk (Managed Platform)

Elastic Beanstalk is a highly automated service designed to **deploy and scale web applications** across various programming languages, including Java, PHP, Node.js, Python, Ruby, Go, and Docker.

*   **Automation and Control:** Users upload their code, and Elastic Beanstalk automatically manages the deployment process, capacity provisioning, automatic scaling, load balancing, and application health monitoring. This greatly simplifies the deployment process for many types of applications.
*   **Resource Access:** Despite the high level of automation, users **retain full control** over the underlying AWS resources that power their application and can access those resources at any time.
*   **Target Environments:** It supports deployment onto familiar servers such as Apache, NGINX, Passenger, and IIS.

### 3. AWS App Runner (Fully Managed Container Service)

App Runner is a **fully managed service** tailored for developers who need to quickly deploy **containerized web applications and APIs** at scale, even if they have **no prior infrastructure experience**.

*   **Deployment Flow:** The user can start with either their source code or a container image. App Runner then automatically performs the build and deployment of the web application.
*   **Automatic Management:** The service automatically load balances traffic (with encryption) and handles scaling, dynamically adjusting capacity up or down to meet real-time traffic needs.

### 4. AWS Amplify (Front-End/Static App Development)

Amplify is a collection of tools and services intended to help **front-end web and mobile developers** build scalable **full-stack applications** powered by AWS.

*   **Key Functionality:** It focuses on simplifying development and management for front-end teams. With Amplify, developers can configure app backends, **deploy static web apps in a few clicks**, connect their applications in minutes, and manage application content outside of the AWS Management Console.

### Deployment Context and Strategy

These tools represent methods for automated deployment in the cloud, addressing traditional hosting problems like the need for oversized server fleets to handle peak capacity. By using services like those listed above, organizations can leverage **on-demand provisioning** to adjust capacity and costs dynamically to match actual traffic patterns.

The goal of this automated approach is twofold:
1.  **Cost Efficiency:** By provisioning resources only when needed, an automatic scaling approach (like that provided by Elastic Beanstalk or App Runner) results in less wasted capacity and a potential reduction in cost compared to provisioning for peak capacity,.
2.  **Scalability and Resilience:** On-demand capacity ensures the system can respond in time to **unexpected traffic spikes**, as new hosts can be launched in minutes and taken offline just as quickly when traffic subsides. This capability also extends to test, load, beta, and reproduction environments, allowing teams to provision and tear down testing infrastructure only as needed, eliminating the cost of expensive, underused parallel fleets,.

This collection of tools supports the modernization of web applications, encouraging shifts toward **containers and serverless technologies** while still offering traditional VPS solutions like Lightsail for simpler needs.