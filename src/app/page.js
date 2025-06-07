"use client";

import React, { useState } from "react";
import { Copy, Check, Search, Database, Cloud, Terminal } from "lucide-react";

const CommandReferenceApp = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("psql");

  // Command data organized by categories
  const commandData = {
    psql: {
      name: "PostgreSQL",
      icon: Database,
      color: "blue",
      commands: [
        {
          id: "psql-1",
          title: "Connect to Database",
          description:
            "Connect to a PostgreSQL database with username and host",
          command: "psql -U username -h hostname -d database_name",
        },
        {
          id: "psql-2",
          title: "List All Databases",
          description: "Display all available databases on the server",
          command: "\\l",
        },
        {
          id: "psql-3",
          title: "Connect to Database",
          description: "Switch to a different database within psql",
          command: "\\c database_name",
        },
        {
          id: "psql-4",
          title: "List All Tables",
          description: "Show all tables in the current database",
          command: "\\dt",
        },
        {
          id: "psql-5",
          title: "Describe Table Structure",
          description: "Display column information for a specific table",
          command: "\\d table_name",
        },
        {
          id: "psql-6",
          title: "List All Schemas",
          description: "Show all schemas in the current database",
          command: "\\dn",
        },
        {
          id: "psql-7",
          title: "List All Users/Roles",
          description: "Display all database users and their privileges",
          command: "\\du",
        },
        {
          id: "psql-8",
          title: "Show Current Database",
          description: "Display the name of the current database",
          command: "SELECT current_database();",
        },
        {
          id: "psql-9",
          title: "Show Database Size",
          description: "Get the size of the current database",
          command:
            "SELECT pg_size_pretty(pg_database_size(current_database()));",
        },
        {
          id: "psql-10",
          title: "List Table Indexes",
          description: "Show all indexes for a specific table",
          command: "\\di table_name",
        },
        {
          id: "psql-11",
          title: "Execute SQL File",
          description: "Run SQL commands from an external file",
          command: "\\i /path/to/file.sql",
        },
        {
          id: "psql-12",
          title: "Export Query Results",
          description: "Save query results to a CSV file",
          command:
            "\\copy (SELECT * FROM table_name) TO '/path/to/output.csv' WITH CSV HEADER;",
        },
        {
          id: "psql-13",
          title: "Show Running Queries",
          description: "Display currently executing queries",
          command: "SELECT * FROM pg_stat_activity WHERE state = 'active';",
        },
        {
          id: "psql-14",
          title: "Kill Query by PID",
          description: "Terminate a specific query using its process ID",
          command: "SELECT pg_terminate_backend(pid);",
        },
        {
          id: "psql-15",
          title: "Vacuum Table",
          description: "Reclaim storage and update statistics for a table",
          command: "VACUUM ANALYZE table_name;",
        },
      ],
    },
    aws: {
      name: "AWS CLI",
      icon: Cloud,
      color: "orange",
      commands: [
        {
          id: "aws-1",
          title: "List S3 Buckets",
          description: "Display all S3 buckets in your account",
          command: "aws s3 ls",
        },
        {
          id: "aws-2",
          title: "List EC2 Instances",
          description: "Show all EC2 instances with basic information",
          command:
            "aws ec2 describe-instances --query 'Reservations[].Instances[].{ID:InstanceId,State:State.Name,Type:InstanceType}'",
        },
        {
          id: "aws-3",
          title: "Upload File to S3",
          description: "Upload a local file to an S3 bucket",
          command: "aws s3 cp local-file.txt s3://bucket-name/folder/",
        },
        {
          id: "aws-4",
          title: "Download from S3",
          description: "Download a file from S3 to local directory",
          command: "aws s3 cp s3://bucket-name/file.txt ./local-directory/",
        },
        {
          id: "aws-5",
          title: "Sync S3 Bucket",
          description: "Synchronize local directory with S3 bucket",
          command:
            "aws s3 sync ./local-folder s3://bucket-name/folder --delete",
        },
        {
          id: "aws-6",
          title: "List IAM Users",
          description: "Display all IAM users in your account",
          command:
            "aws iam list-users --query 'Users[].{Name:UserName,Created:CreateDate}'",
        },
        {
          id: "aws-7",
          title: "Create S3 Bucket",
          description: "Create a new S3 bucket in specified region",
          command: "aws s3 mb s3://bucket-name --region us-east-1",
        },
        {
          id: "aws-8",
          title: "Start EC2 Instance",
          description: "Start a stopped EC2 instance",
          command: "aws ec2 start-instances --instance-ids i-1234567890abcdef0",
        },
        {
          id: "aws-9",
          title: "Stop EC2 Instance",
          description: "Stop a running EC2 instance",
          command: "aws ec2 stop-instances --instance-ids i-1234567890abcdef0",
        },
        {
          id: "aws-10",
          title: "List RDS Instances",
          description: "Show all RDS database instances",
          command:
            "aws rds describe-db-instances --query 'DBInstances[].{ID:DBInstanceIdentifier,Engine:Engine,Status:DBInstanceStatus}'",
        },
        {
          id: "aws-11",
          title: "Get CloudWatch Logs",
          description: "Retrieve logs from a CloudWatch log group",
          command:
            "aws logs filter-log-events --log-group-name /aws/lambda/function-name --start-time 1609459200000",
        },
        {
          id: "aws-12",
          title: "List Lambda Functions",
          description: "Display all Lambda functions in your account",
          command:
            "aws lambda list-functions --query 'Functions[].{Name:FunctionName,Runtime:Runtime,Modified:LastModified}'",
        },
        {
          id: "aws-13",
          title: "Configure AWS Profile",
          description: "Set up AWS credentials and configuration",
          command: "aws configure --profile profile-name",
        },
        {
          id: "aws-14",
          title: "Get Account Information",
          description: "Display current AWS account details",
          command: "aws sts get-caller-identity",
        },
        {
          id: "aws-15",
          title: "List VPCs",
          description: "Show all Virtual Private Clouds in your account",
          command:
            "aws ec2 describe-vpcs --query 'Vpcs[].{ID:VpcId,CIDR:CidrBlock,State:State}'",
        },
      ],
    },
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const currentCategory = commandData[activeCategory];
  const filteredCommands = currentCategory.commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-600",
        hover: "hover:bg-blue-700",
        ring: "focus:ring-blue-500",
        text: "text-blue-600",
      },
      orange: {
        bg: "bg-orange-600",
        hover: "hover:bg-orange-700",
        ring: "focus:ring-orange-500",
        text: "text-orange-600",
      },
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">
              Command Reference Hub
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Quick lookup for CLI commands across platforms
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            {Object.entries(commandData).map(([key, category]) => {
              const IconComponent = category.icon;
              const colorClasses = getColorClasses(category.color);
              const isActive = activeCategory === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setSearchTerm("");
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    isActive
                      ? `${colorClasses.bg} text-white`
                      : `text-gray-600 hover:text-gray-900 hover:bg-gray-100`
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${currentCategory.name} commands...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
              getColorClasses(currentCategory.color).ring
            } focus:ring-2 focus:border-transparent outline-none`}
          />
        </div>

        {/* Commands Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredCommands.map((cmd) => (
            <div
              key={cmd.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {cmd.title}
                </h3>
                <p className="text-gray-600">{cmd.description}</p>
              </div>

              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-4 pr-12">
                  <code className="text-green-400 font-mono text-sm break-all">
                    {cmd.command}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(cmd.command, cmd.id)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors rounded"
                  title="Copy to clipboard"
                >
                  {copiedId === cmd.id ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCommands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No commands found matching your search.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Found {filteredCommands.length} of {currentCategory.commands.length}{" "}
            {currentCategory.name} commands
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommandReferenceApp;
