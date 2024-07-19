# What is clusters in Node.JS?

Node.Js clusters are used to run multiple instances in single threaded Node application. By using cluster module you can distribute workloads among application threads. The cluster module allows us to create child processes that all share server ports. To handle heavy load, we need to launch a cluster of Node.js processes and hence make use of multiple cores.

Each child process has its own event loop, memory, V8 instance, and shares the same server port.


## Master process & Worker process

The master process (identified by cluster.isMaster) forks multiple worker processes.Each worker process (identified by cluster.isWorker) runs independently and performs its own tasks.The master process listens for worker exit events and forks a new worker when one exits.

## Creating a simple cluster

Create a new file named index.js and copy the contents from this repository.

Make sure to run the following commands in project folder

```bash
npm init
npm install cluster
npm install os
```

or you can copy the package.json file and run

```bash
npm install
```

## Find computation time - without cluster threads

We are going to compute factorial number of 100000 in both normal nodejs single thread and cluster thread to compare.

Run the below command to run the normal js file,

```bash
node index.js
```


## Find computation time - with cluster threads

Run the below command to run the cluster threads,

```bash
node without-cluster-threads.js
```

## Comparison

Normal thread took 1913 ms (this could vary for you, to show approximate difference have given my execution time.)
And cluster threads took 309 ms to calculate factorial number of the same number.

Thus by taking advantage of cluster feature, we could split our long running tasks to execute fastly.