import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink as PaginationLinkUI,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import { PaginationLink } from '@/types/pagination';

type Props = {
    links: PaginationLink[];
};

export default function TablePagination({ links }: Props) {
    if (links.length <= 3) return null;

    return (
        <Pagination className="justify-end">
            <PaginationContent>
                {links.map((link, index) => {
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;

                    if (isFirst) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious href={link.url || '#'} className={!link.url ? 'pointer-events-none opacity-50' : ''} />
                            </PaginationItem>
                        );
                    }

                    if (isLast) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext href={link.url || '#'} className={!link.url ? 'pointer-events-none opacity-50' : ''} />
                            </PaginationItem>
                        );
                    }

                    if (link.label === '...') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLinkUI href={link.url || '#'} isActive={link.active}>
                                {link.label}
                            </PaginationLinkUI>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
