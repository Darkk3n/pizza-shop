// Tests share one database and one bootstrap admin (the last-admin rule depends on it),
// so they run one at a time.
[assembly: CollectionBehavior(DisableTestParallelization = true)]
