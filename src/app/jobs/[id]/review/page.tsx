"use client"

import { useAppUser } from "@/lib/useAppUser";
import { api } from "@convex/_generated/api";
import {
    Spinner,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Link,
} from "@nextui-org/react"
import { useQuery } from "convex/react";
import React from "react";
import { Id } from "@convex/_generated/dataModel"


interface ReviewApplicationsPageProps { }

interface ReviewApplicationsPageProps {
    params: {
        id: string;
    };
}

const ReviewApplications: React.FC<ReviewApplicationsPageProps> = ({ params }) => {
    const { user } = useAppUser()

    // if (user && user.role === "coder") {
    //     return <h1>Unauthorized</h1>
    // }

    // const id = params.id

    // const applications = useQuery(api.applications.getApplicationsByJob, { id: id })
    const applications = useQuery(api.applications.getApplicationsByJob, { id: "jn77tm5cf8xdzb236kggz8f8md6kzepa" })

    const columns = [
        { key: "userId", label: "Candidates Id" },
        { key: "userName", label: "Candidates Name" },
        { key: "projectId", label: "Project Id" },
        { key: "projectName", label: "Project Name" },
        { key: "deployedPage", label: "Home Page" },
        { key: "status", label: "Application Status" },
    ]

    return (
        <>
            <h1 className="font-bold text-2xl p-5 text-center">Review Applications</h1>
            <Table aria-label="Application Table">
                <TableHeader>
                    {columns.map(column => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody
                    items={applications || []}
                    emptyContent={"No candidates yet."}>
                    {(item) => (
                        <TableRow key={item.userId}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === 'projectName' ?
                                        <Link href={item['projectLink']}>{getKeyValue(item, columnKey)}</Link> :
                                        columnKey === 'deployedPage' ?
                                            <Link href={item['deployedPage']}>{getKeyValue(item, columnKey)}</Link> :
                                            getKeyValue(item, columnKey)
                                    }
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default ReviewApplications;